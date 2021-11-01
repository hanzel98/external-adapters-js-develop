"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPairQuery = exports.getTokenQuery = void 0;
exports.getTokenQuery = `
    query($symbol: String) {
        tokens(
            where:{
            symbol: $symbol
            }, 
            orderBy: tradeVolumeUSD, orderDirection:desc, first: 1
        ) {
        id,
        name
        }
    }
`;
exports.getPairQuery = `
    query($token0ID: String, $token1ID: String) {
        pairs(where: {
            token0: $token0ID,
            token1: $token1ID
        }) {
            token0Price,
            token1Price
        }
    }
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhcGhxbFF1ZXJpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWV0aG9kcy9wcmljZXMvZGV4L2dyYXBocWxRdWVyaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFhLFFBQUEsYUFBYSxHQUFHOzs7Ozs7Ozs7Ozs7Q0FZNUIsQ0FBQTtBQUVZLFFBQUEsWUFBWSxHQUFHOzs7Ozs7Ozs7O0NBVTNCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgZ2V0VG9rZW5RdWVyeSA9IGBcbiAgICBxdWVyeSgkc3ltYm9sOiBTdHJpbmcpIHtcbiAgICAgICAgdG9rZW5zKFxuICAgICAgICAgICAgd2hlcmU6e1xuICAgICAgICAgICAgc3ltYm9sOiAkc3ltYm9sXG4gICAgICAgICAgICB9LCBcbiAgICAgICAgICAgIG9yZGVyQnk6IHRyYWRlVm9sdW1lVVNELCBvcmRlckRpcmVjdGlvbjpkZXNjLCBmaXJzdDogMVxuICAgICAgICApIHtcbiAgICAgICAgaWQsXG4gICAgICAgIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbmBcblxuZXhwb3J0IGNvbnN0IGdldFBhaXJRdWVyeSA9IGBcbiAgICBxdWVyeSgkdG9rZW4wSUQ6IFN0cmluZywgJHRva2VuMUlEOiBTdHJpbmcpIHtcbiAgICAgICAgcGFpcnMod2hlcmU6IHtcbiAgICAgICAgICAgIHRva2VuMDogJHRva2VuMElELFxuICAgICAgICAgICAgdG9rZW4xOiAkdG9rZW4xSURcbiAgICAgICAgfSkge1xuICAgICAgICAgICAgdG9rZW4wUHJpY2UsXG4gICAgICAgICAgICB0b2tlbjFQcmljZVxuICAgICAgICB9XG4gICAgfVxuYFxuIl19