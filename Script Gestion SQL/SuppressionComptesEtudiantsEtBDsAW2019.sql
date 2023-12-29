USE EtudiantDB2
GO

DECLARE @da NVARCHAR(10);
DECLARE @nom NVARCHAR(50);
DECLARE @traite INT;
DECLARE @etudiant CURSOR;
DECLARE @sqlstmt NVARCHAR(1000);
 
SET @etudiant = CURSOR FOR
	SELECT da,nom,traite
	FROM dbo.Etudiant

OPEN @etudiant
FETCH NEXT
FROM @etudiant INTO @da, @nom, @traite

WHILE @@FETCH_STATUS = 0
BEGIN
  IF(@traite = 0) 
  BEGIN
	  print @da+'  '+ @nom

	  print 'Suppression de la bd'
	  SET @sqlstmt = 'DROP DATABASE [AdventureWorks2019e'+@da+'] '	  
	  print @sqlstmt
	  exec(@sqlstmt)

	  print 'Suppression de l''usager'
	  

	  SET @sqlstmt = 'DROP LOGIN [e' +@da + ']' 
	  exec(@sqlstmt) 
  END
  FETCH NEXT 
  FROM @etudiant INTO @da, @nom, @traite
END

CLOSE @etudiant
DEALLOCATE @etudiant