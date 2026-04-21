class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale
  before_action :save_refcode
  before_action :redirect_after_login

  rescue_from ActiveRecord::RecordInvalid do |exception|
    raise exception unless request.inertia?

    redirect_back inertia: {
      errors: exception.record.errors
    }
  end

  inertia_share do
    {
      locale: I18n.locale
    }
  end

  private

  def redirect_after_login
    return unless cookies[:signed_user_id].present? && !current_user
    if session[:after_login_path].present?
      redirect_to session.delete(:after_login_path)
    end
  end

  def save_refcode
    return unless params[:ref].present?

    cookies[:refcode] = {
      value: params[:ref],
      expires: 30.days.from_now
    }
  end

  def set_locale
    I18n.locale = extract_locale || I18n.default_locale
  end

  def extract_locale
    parsed_locale = request.host.split(".").last
    I18n.available_locales.map(&:to_s).include?(parsed_locale) ? parsed_locale : nil
  end
end
