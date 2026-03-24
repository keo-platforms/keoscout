class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.integer :price, null: false, default: 0
      t.datetime :published_at
      t.timestamps
    end
  end
end
