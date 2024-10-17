class ItemListState < Clapton::State
  attribute :item_id

  def set_item(params)
    self.item_id = params[:item][:id]
  end
end
