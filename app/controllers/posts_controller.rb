# frozen_string_literal: true

class PostsController < InertiaController
  def index
  end

  def new
  end

  def show
    post = Post.find(params[:id])
    @post = post.as_json(include: [ :files ])
  end

  def create
    post = Post.create!
    post.files.attach(params[:image])
    redirect_to post
  end
end
