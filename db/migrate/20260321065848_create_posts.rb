class CreatePosts < ActiveRecord::Migration[8.1]
  def change
    create_table :posts do |t|
      t.integer :price, null: false, default: 0
      t.integer :user_id, null: false
      t.datetime :published_at
      t.timestamps
    end
  end
end
