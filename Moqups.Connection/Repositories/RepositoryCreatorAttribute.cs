using System;
using System.ComponentModel.Composition;

namespace Moqups.Connection.Repositories
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
