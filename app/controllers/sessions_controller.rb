class SessionsController < ApplicationController
  def new
    render layout: false if params[:provider]
  end

  def create
    auth = request.env["omniauth.auth"]
    identity = Identity.from_omniauth!(auth)

    session[:user_id] = identity.user_id

    flash[:notice] = "Signed in successfully."
    render layout: false
  end

  def destroy
    session.delete(:user_id)
    redirect_to root_path, notice: "Signed out successfully."
  end
end
