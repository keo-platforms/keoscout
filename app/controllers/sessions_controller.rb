class SessionsController < ApplicationController
  def new
    render layout: false if params[:provider]
  end

  def create
    auth = request.env["omniauth.auth"]
    identity = Identity.from_omniauth!(auth)

    cookies[:signed_user_id] = { value: identity.user.signed_id }

    flash[:notice] = "Signed in successfully."
    render layout: false
  end

  def destroy
    cookies.delete(:signed_user_id)
    redirect_to root_path, notice: "Signed out successfully."
  end
end
