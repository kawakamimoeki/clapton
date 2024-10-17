class ItemListComponent < Clapton::Component
  def render
    box = c(:box)
    @state.items.map do |item|
      box.add(ItemComponent.new(item: item, selected: item[:id] == @state.item_id))
    end
    box
  end
end
