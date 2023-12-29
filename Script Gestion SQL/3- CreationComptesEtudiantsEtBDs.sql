USE EtudiantBD2
GO

DECLARE @da NVARCHAR(10);
DECLARE @nom NVARCHAR(50);
DECLARE @traite INT;
DECLARE @etudiant CURSOR;
DECLARE @sqlstmt NVARCHAR(1000);
DECLARE @sqlstmt_use NVARCHAR(1000);
 
SET @etudiant = CURSOR FOR
	SELECT da,nom,traite
	FROM dbo.Etudiant where da = '0000001'

OPEN @etudiant
FETCH NEXT
FROM @etudiant INTO @da, @nom, @traite

WHILE @@FETCH_STATUS = 0
BEGIN
  IF(@traite = 0) 
  BEGIN
	  print @da+'  '+ @nom

	  print 'Copie de la bd'
	  SET @sqlstmt = 'RESTORE DATABASE [AdventureWorks2019e'+@da+'] '
	  SET @sqlstmt = @sqlstmt + 'FROM  DISK = N''/var/opt/mssql/backups/AdventureWorks2019.bak''' 
	  SET @sqlstmt = @sqlstmt + 'WITH  FILE = 1,' 
	  SET @sqlstmt = @sqlstmt + 'MOVE N''AdventureWorks2017'' TO N''/var/opt/mssql/data/AdventureWorks2019e'+@da+'_Data.mdf'','  
	  SET @sqlstmt = @sqlstmt + 'MOVE N''AdventureWorks2017_log'' TO N''/var/opt/mssql/data/AdventureWorks2019e'+@da+'_Log.ldf'','
	  SET @sqlstmt = @sqlstmt + 'NOUNLOAD,  STATS = 5'
	  print @sqlstmt
	  exec(@sqlstmt)

	  print 'Création de l''usager'
	  SET @sqlstmt_use = 'USE [AdventureWorks2019e'+@da+'];'

	  SET @sqlstmt = @sqlstmt_use + 'CREATE LOGIN [e' +@da + '] WITH PASSWORD=N''usager@db2'' MUST_CHANGE, 
	  DEFAULT_DATABASE=[AdventureWorks2019e'+@da+'], CHECK_EXPIRATION=ON, CHECK_POLICY=ON;'

	  SET @sqlstmt = @sqlstmt +'CREATE USER [e'+@da+'] FOR LOGIN [e'+@da+'];'
	  SET @sqlstmt = @sqlstmt +'ALTER ROLE [db_owner] ADD MEMBER [e'+@da+'];'

	  SET @sqlstmt = @sqlstmt +'ALTER SERVER ROLE [dbcreator] ADD MEMBER [e'+@da+'];' /* l'étudiant pourra créer des BDs.*/
	  exec(@sqlstmt) 
  END
  FETCH NEXT 
  FROM @etudiant INTO @da, @nom, @traite
END

CLOSE @etudiant
DEALLOCATE @etudiant