class ItemComponent < Clapton::Component
  def render
    c(:box, { style: @state.selected ? "background-color: red;" : "" })
      .add(c(:text, @state.item.name))
      .add_action(:click, :ItemListState, :set_item)
  end
end
