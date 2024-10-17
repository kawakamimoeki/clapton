class ShopState < Clapton::State
  attribute :categories
  attribute :items
  attribute :category_id

  def set_category(params)
    self.category_id = params[:category][:id]
  end
end
