using System;
using System.ComponentModel.Composition;

namespace DAL
{
    [MetadataAttribute]
    [AttributeUsage(AttributeTargets.Class, Inherited = false, AllowMultiple = false)]
    public sealed class RepositoryCreatorAttribute : ExportAttribute
    {
        public RepositoryCreatorAttribute(Type repositoryForEntityOfType)
            : base(typeof(IRepositoryCreator))
        {
            RepositoryForEntityOfType = repositoryForEntityOfType;
        }

        public Type RepositoryForEntityOfType { get; private set; }
    }
}
