class NotesController < ApplicationController

    def index

    end

    def show

    end

    def create
        Note.create(note_params)
    end

    def update

    end

    def destroy

    end
end
