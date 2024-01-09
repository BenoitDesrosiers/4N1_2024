namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information d'un livre
/// </summary>
public class Livre : BaseDocument, ILivre
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public Livre() : base()
    {

    }

    /// <summary>
    /// Constructeur d'initialisation
    /// </summary>
    /// <param name="auteur">L'auteur du livre</param>
    /// <param name="titre">Le titre du livre</param>
    /// <param name="publication">La date de publication du livre</param>
    /// <param name="nombrePage">Nombre de page du livre</param>
    public Livre(string auteur, string titre, DateTime publication, int nombrePage) : base(auteur, titre, publication)
    {
        NombrePage = nombrePage;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du livre (Auteur, Titre et NombrePage)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return $"L'auteur du livre intitulé {Titre} est {Auteur}. Le livre a {NombrePage} {(NombrePage > 1 ? "pages" : "page")}.";
    }
    #endregion

    #region Propriétés
    public int NombrePage { get; set; }
    #endregion
}

