﻿using System.Web.Mvc;
using System.Web.Routing;

namespace Moqups.App
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "404-catch-all",
                url: "{*catchall}",
                defaults: new { controller = "Error", action = "NotFound" });
        }
    }
}