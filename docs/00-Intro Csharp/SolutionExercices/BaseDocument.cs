namespace ExercicesCours1;

/// <summary>
/// Classe abstraite contenant l'information de base d'un document
/// </summary>
public abstract class BaseDocument
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public BaseDocument()
    {

    }

    /// <summary>
    /// Constructeur d'initialisation
    /// </summary>
    /// <param name="auteur">L'auteur du document</param>
    /// <param name="titre">Le titre du document</param>
    /// <param name="publication">La date de publication du document</param>
    public BaseDocument(string auteur, string titre, DateTime publication)
    {
        Auteur = auteur;
        Titre = titre;
        Publication = publication;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du document (Auteur et Titre)
    /// </summary>
    /// <returns>La phrase</returns>
    public abstract string AfficherInfo();

    /// <summary>
    /// Génère la phrase pour afficher le message de la date de publication
    /// </summary>
    /// <returns>La phrase</returns>
    public virtual string AfficherPublication()
    {
        return $"La date de publication est le {Publication:d MMMM yyyy}.";
    }
    #endregion

    #region Propriétés 
    public string Auteur { get; set; }
        
    public string Titre { get; set; }
        
    public DateTime Publication { get; set; }
    #endregion
}