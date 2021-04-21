class LanguagesController < ApplicationController
    before_action :find_language, only: [:show, :destroy]

    def index
        languages = Language.all
        render json: languages, include: [:notes]
    end

    def show
        render json: @language, include: [:notes]
    end

    def create
        language = Language.create(language_params)

        render json: language
    end

    def edit
        @language.update(language_params)
    end

    def destroy
        @language.delete
    end

    private
    def language_params
        params.require(:language).permit(:name, :category)
    end

    def find_language
        @language = Language.find_by(id: params[:id])
    end
end
