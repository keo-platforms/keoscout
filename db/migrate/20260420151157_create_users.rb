class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :locale, default: "en"
      t.string :referral_code
      t.integer :earnings, default: 0
      t.integer :referrals_count, default: 0
      t.integer :referrer_id
      t.timestamps
    end
  end
end
