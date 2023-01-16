using System.Collections.Generic;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IproductRepository
    {
        Task<Product>GetProductByIdAsync(int id);
        Task<IReadOnlyList<Product>>GetProductAsync();
        Task<IReadOnlyList<ProductBrand>>GetProductBrandsAsync();
        Task<IReadOnlyList<ProductType>>GetProductTypesAsync();
    }
}