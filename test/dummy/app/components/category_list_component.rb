class CategoryListComponent < Clapton::Component
  def render
    box = c(:box)
    @state.categories.map do |category|
      box.add(CategoryComponent.new(category: category))
    end
    box
  end
end
