namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information des notes de cours
/// </summary>
public class NoteCours : BaseDocument, INoteCours
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public NoteCours() : base()
    {
    }

    /// <summary>
    /// Constructeur d'initialisation
    /// </summary>
    /// <param name="auteur">L'auteur des notes de cours</param>
    /// <param name="titre">Le titre des notes de cours</param>
    /// <param name="publication">La date de publication des notes de cours</param>
    /// <param name="matiere">La matière des notes de cours</param>
    /// <param name="session">La session d'utilisation des notes de cours</param>
    public NoteCours(string auteur, string titre, DateTime publication, string matiere, string session) : base(auteur, titre, publication)
    {
        Matiere = matiere;
        Session = session;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information des notes de cours (Auteur, Titre et Matière)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return $"L'auteur des notes intitulé {Titre} est {Auteur ?? "non disponible"}. La matière est {Matiere}.";
    }

    /// <summary>
    /// Génère la phrase pour afficher le message de la date de publication des notes de cours et la session d'utilisation
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherPublication()
    {
        return $"Les notes ont été publiées le {Publication:d MMMM yyyy} pour la session {Session}.";
    }
    #endregion

    #region Propriétés
    public string Matiere { get; set; }

    public string Session { get; set; }
    #endregion
}

