class UsersController < ApplicationController
  before_action :current_user, only: [:verify_login, :login]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    @user = User.new(user_params)
    session[:user_id] = @user.id
    if @user.save
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def verify_login
    binding.pry
        if logged_in?
      render json: {session: session['user_id']}
        end
  end

  def login
      @user = find_by_email
      if @user
        return session[:user_id] = @user.id
      else
        render json: {errors: "Invalid email"}
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:name, :email)
    end

    def find_by_email
      @user = User.find_by(params[:email])
    end

    def current_user
   User.find_by(id: session[:user_id])
    end

    def logged_in?
       
    !current_user.nil?
    end
end
