using System.Collections.Generic;
using System.ComponentModel.Composition;
using FizzWare.NBuilder;
using Moqups.BL.Infrastructure;
using Moqups.Entities;

namespace Moqups.BL
{
    [Export(typeof(IUserService)), PartCreationPolicy(CreationPolicy.NonShared)]
    public class UserServiceImpl : IUserService
    {
        public IList<User> GetUsers()
        {
            return Builder<User>.CreateListOfSize(10)
                .TheFirst(3)
                .With(x => x.Pages, Builder<Page>.CreateListOfSize(3).Build())
                .TheNext(3)
                .With(x => x.Pages, Builder<Page>.CreateListOfSize(2).Build())
                .TheNext(4)
                .With(x => x.Pages, Builder<Page>.CreateListOfSize(1).Build())
                .Build();
        }
    }
}
