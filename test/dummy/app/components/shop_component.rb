class ShopComponent < Clapton::Component
  def render
    c(:h, 1)
      .add(c(:text, "Shop"))
      .add(CategoryListComponent.new(categories: @state.categories))
      .add(ItemListComponent.new(items: @state.items.select { |item| item.category_id == @state.category_id }))
  end
end
