class CategoryComponent < Clapton::Component
  def render
    c(:button)
      .add(c(:text, @state.category.name))
      .add_action(:click, :ShopState, :set_category)
  end
end
