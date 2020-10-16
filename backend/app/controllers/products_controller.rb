class ProductsController < ActionController::API
  before_action :set_product, only: %i[show]

  # GET /products
  def index
    if params['user_id']
      @user = User.find(params['user_id'])
      @products = @user.products
    else
      @products = Product.all
    end
    render json: @products
  end

  def show
    render json: @product
  end

  def create
    @user = User.find(params[:user_id])

    @user.products.create(product_params)
    if @user.save
      render json: @user.products.last, status: :created, location: user_product_path(@user, @user.products.last)
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product = Product.find_by(asin: params[:asin])
    @product.destroy
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def product_params
    params.require(:product).permit(:asin, :title, :price, :imageurl, :detailpageurl, :rating, :totalreviews)
  end
end
