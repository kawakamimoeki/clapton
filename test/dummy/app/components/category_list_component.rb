class CategoryListComponent < Clapton::Component
  def render
    box = c(:div)
    @state.categories.map do |category|
      box.add(CategoryComponent.new(category: category))
    end
    box
  end
end
