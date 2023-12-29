CREATE VIEW vInfoPays
AS
	SELECT
		Pays.PaysId,
		Pays.NomPays,
		COUNT(DISTINCT Client.ClientId) AS NbClient,
		COUNT(DISTINCT Developpeur.DeveloppeurId) AS NbDeveloppeur
	FROM Pays
	LEFT OUTER JOIN Client ON Pays.PaysId = Client.PaysId
	LEFT OUTER JOIN Developpeur ON Pays.PaysId = Developpeur.PaysId
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