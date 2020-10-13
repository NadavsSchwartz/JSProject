class User < ApplicationRecord
has_many :products
validates_uniqueness_of :email

end
