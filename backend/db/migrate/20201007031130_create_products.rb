class CreateProducts < ActiveRecord::Migration[6.0]
  def change
    create_table :products do |t|
      t.string :asin
      t.string :title
      t.string :price
      t.string :imageurl
      t.string :detailpageurl
      t.string :rating
      t.string :totalreviews
      t.belongs_to :user
      t.timestamps
    end
  end
end
