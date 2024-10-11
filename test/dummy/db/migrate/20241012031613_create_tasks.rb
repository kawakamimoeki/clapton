class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :title
      t.datetime :due
      t.boolean :done

      t.timestamps
    end
  end
end
