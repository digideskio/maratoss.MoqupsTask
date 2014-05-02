using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace Moqups.App.Models
{
    public static class TooltipService
    {
        private static readonly Dictionary<Tuple<PropertyInfo, string>, string> _dictionary =
            new Dictionary<Tuple<PropertyInfo, string>, string>();

        public static string GetTooltipFor<TSource>(
            Expression<Func<TSource, object>> expr,
            string contract = null)
        {
            PropertyInfo pInfo = GetPropertyInfo(expr);
            var tuple = Tuple.Create(pInfo, contract);
            if (_dictionary.ContainsKey(tuple))
            {
                return _dictionary[tuple];
            }

            return null;
        }

        public static void RegisterTooltip<TSource>(
            Expression<Func<TSource, object>> expr,
            string tooltip, string contract = null)
        {
            PropertyInfo pInfo = GetPropertyInfo(expr);
            _dictionary.Add(Tuple.Create(pInfo, contract), tooltip);
        }

        public static void DeleteTooltip<TSource>(
            Expression<Func<TSource, object>> expr,
            string contract = null)
        {
            PropertyInfo pInfo = GetPropertyInfo(expr);
            var tuple = Tuple.Create(pInfo, contract);
            if (_dictionary.ContainsKey(tuple))
            {
                _dictionary.Remove(tuple);
            }
        }

        private static PropertyInfo GetPropertyInfo<TSource>(
            Expression<Func<TSource, object>> propertyLambda)
        {
            Type type = typeof(TSource);

            MemberExpression member = propertyLambda.Body as MemberExpression;
            if (member == null)
                throw new ArgumentException(string.Format(
                    "Expression '{0}' refers to a method, not a property.",
                    propertyLambda));

            PropertyInfo propInfo = member.Member as PropertyInfo;
            if (propInfo == null)
                throw new ArgumentException(string.Format(
                    "Expression '{0}' refers to a field, not a property.",
                    propertyLambda));

            if (type != propInfo.ReflectedType &&
                !type.IsSubclassOf(propInfo.ReflectedType))
                throw new ArgumentException(string.Format(
                    "Expresion '{0}' refers to a property that is not from type {1}.",
                    propertyLambda,
                    type));

            return propInfo;
        }
    }
}