class Product < ApplicationRecord
    belongs_to :user

    def get_products(data)
        response = Unirest.get "https://amazon-price1.p.rapidapi.com/search?keywords=#{data}&marketplace=US",
        headers:{
            "X-RapidAPI-Host" => "amazon-price1.p.rapidapi.com",
            "X-RapidAPI-Key" => "04ffdca11fmsh6d2319daea4c209p172278jsn9b371a9115f8"
        }
    end
end
