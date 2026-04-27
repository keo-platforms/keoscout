class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  before_action :set_locale
  before_action :save_refcode
  before_action :redirect_after_login
  before_action :set_active_storage_url_options


  rescue_from ActiveRecord::RecordInvalid do |exception|
    raise exception unless request.inertia?

    redirect_back inertia: {
      errors: exception.record.errors
    }
  end

  inertia_share do
    {
      locale: I18n.locale,
      current_user: current_user.as_json
    }
  end

  private

  def current_user
    Current.user ||= User.find_by(id: session[:user_id])
  end

  def redirect_after_login
    return unless current_user
    return unless session[:after_login_path].present?
    redirect_to session.delete(:after_login_path)
  end

  def save_refcode
    return unless params[:ref].present?

    cookies[:refcode] = {
      value: params[:ref],
      expires: 30.days.from_now
    }
  end

  def set_active_storage_url_options
    ActiveStorage::Current.url_options = {
      host: request.host,
      port: request.port,
      protocol: request.protocol
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
