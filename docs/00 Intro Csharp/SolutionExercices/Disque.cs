namespace ExercicesCours1;

/// <summary>
/// Classe qui contient l'information d'un disque compact
/// </summary>
public class Disque : BaseDocument, IDisque
{
    #region Constructeurs
    /// <summary>
    /// Constructeur par défaut
    /// </summary>
    public Disque() : base()
    {
    }

    /// <summary>
    /// Constructeur d'initialisation
    /// </summary>
    /// <param name="auteur">L'auteur du disque</param>
    /// <param name="titre">Le titre du disque</param>
    /// <param name="publication">La date de publication du disque</param>
    /// <param name="tailleMo">La taille en méga octet du disque</param>
    public Disque(string auteur, string titre, DateTime publication, decimal tailleMo) : base(auteur, titre, publication)
    {
        TailleMo = tailleMo;
    }
    #endregion

    #region Méthodes
    /// <summary>
    /// Génère la phrase pour afficher le message contenant l'information du disque (Auteur, Titre et NombreMinute)
    /// </summary>
    /// <returns>La phrase</returns>
    public override string AfficherInfo()
    {
        return String.Format("L'auteur du disque intitulé {0} est {1}. Le disque a une taille de {2:N3} Mo.", Titre, Auteur, TailleMo);
    }
    #endregion

    #region Propriétés
    public decimal TailleMo { get; set; }
    #endregion
}

