class NotesController < ApplicationController

    def index

    end

    def show

    end

    def create
        Note.new(note_params)
    end

    def update

    end

    def destroy

    end
end
