CREATE VIEW vInfoPays
AS
	SELECT
		Pays.PaysId,
		Pays.NomPays,
		COUNT(DISTINCT Client.ClientId) AS NbClient		
	FROM Pays
	LEFT OUTER JOIN Client ON Pays.PaysId = Client.PaysId	
	GROUP BY Pays.PaysId, Pays.NomPays
GO

CREATE VIEW vInfoApplication
AS
	SELECT
		[Application].ApplicationId,
		[Application].Titre,
		[Application].DeveloppeurId,
		COUNT(Achat.ApplicationId) AS NbVente,
		SUM(Achat.PrixPaye) AS TotalVente,
		AVG(Achat.Note) AS NoteMoyenne		
	FROM [Application]
	INNER JOIN Achat ON [Application].ApplicationId = Achat.ApplicationId	
	GROUP BY [Application].ApplicationId, [Application].Titre, [Application].DeveloppeurId
GO