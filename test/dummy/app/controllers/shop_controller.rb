class ShopController < ApplicationController
  def index
    @items = Item.all.map do |item|
      {
        id: item.id,
        name: item.name,
        category_id: item.category_id,
      }
    end
    @categories = Category.all.map do |category|
      {
        id: category.id,
        name: category.name,
      }
    end
    @components = [
      [:ShopComponent, { items: @items, categories: @categories }],
    ]
  end
end
