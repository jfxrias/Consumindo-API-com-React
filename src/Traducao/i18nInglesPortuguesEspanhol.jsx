import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  pt: {
    translation: {
      // Configurações
      settings: "Painel de Configurações",
      account: "Conta",
      newPassword: "Nova senha",
      changePassword: "Alterar Senha",
      login: "Login",
      updateProfile: "Atualizar Perfil",
      language: "Idioma",
      languageChanged: "Idioma alterado com sucesso!",
      errorChangePassword: "Erro ao alterar senha",
      errorUpdateProfile: "Erro ao atualizar perfil",
      errorChangeLanguage: "Erro ao mudar idioma",
      fontPreferences: "Preferências de Fonte",
      fontSize: "Tamanho da Fonte",
      fontType: "Tipo de Fonte",
      previewText: "Exemplo de texto com {{size}}px em {{font}}",

      // NavBar
      home: "Home",
      myNotes: "Minhas Notas",
      darkMode: "Escuro",
      logout: "Sair",

      // Home
      homeTitle: "Minhas Notas",
      notesCountSingular: "nota",
      notesCountPlural: "notas",
      noNotesFound: "Nenhuma nota encontrada",
      noNotesYet: "Nenhuma nota ainda",
      tryOtherFilters: "Tente outros termos.",
      createFirstNote: "Crie sua primeira nota para começar.",
      clearFilters: "Limpar filtros",

      // Minhas Notas
      mural: "Mural",
      addNote: "Adicionar Nota",
      save: "Salvar",
      cancel: "Cancelar",
      delete: "Excluir",
      edit: "Editar",
      emptyTextAlert: "O campo de texto não pode estar vazio!"
    }
  },
  en: {
    translation: {
      // Settings
      settings: "Settings Panel",
      account: "Account",
      newPassword: "New password",
      changePassword: "Change Password",
      login: "Login",
      updateProfile: "Update Profile",
      language: "Language",
      languageChanged: "Language changed successfully!",
      errorChangePassword: "Error changing password",
      errorUpdateProfile: "Error updating profile",
      errorChangeLanguage: "Error changing language",
      fontPreferences: "Font Preferences",
      fontSize: "Font Size",
      fontType: "Font Type",
      previewText: "Sample text with {{size}}px in {{font}}",

      // NavBar
      home: "Home",
      myNotes: "My Notes",
      darkMode: "Dark",
      logout: "Logout",

      // Home
      homeTitle: "My Notes",
      notesCountSingular: "note",
      notesCountPlural: "notes",
      noNotesFound: "No notes found",
      noNotesYet: "No notes yet",
      tryOtherFilters: "Try other terms.",
      createFirstNote: "Create your first note to start.",
      clearFilters: "Clear filters",

      // My Notes
      mural: "Board",
      addNote: "Add Note",
      save: "Save",
      cancel: "Cancel",
      delete: "Delete",
      edit: "Edit",
      emptyTextAlert: "Text field cannot be empty!"
    }
  },
  es: {
    translation: {
      // Configuración
      settings: "Panel de Configuración",
      account: "Cuenta",
      newPassword: "Nueva contraseña",
      changePassword: "Cambiar contraseña",
      login: "Usuario",
      updateProfile: "Actualizar perfil",
      language: "Idioma",
      languageChanged: "¡Idioma cambiado con éxito!",
      errorChangePassword: "Error al cambiar la contraseña",
      errorUpdateProfile: "Error al actualizar el perfil",
      errorChangeLanguage: "Error al cambiar el idioma",
      fontPreferences: "Preferencias de Fuente",
      fontSize: "Tamaño de Fuente",
      fontType: "Tipo de Fuente",
      previewText: "Ejemplo de texto con {{size}}px en {{font}}",

      // NavBar
      home: "Inicio",
      myNotes: "Mis Notas",
      darkMode: "Oscuro",
      logout: "Salir",

      // Home
      homeTitle: "Mis Notas",
      notesCountSingular: "nota",
      notesCountPlural: "notas",
      noNotesFound: "No se encontraron notas",
      noNotesYet: "Todavía no hay notas",
      tryOtherFilters: "Prueba otros términos.",
      createFirstNote: "Crea tu primera nota para empezar.",
      clearFilters: "Limpiar filtros",

      // Mis Notas
      mural: "Muro",
      addNote: "Agregar Nota",
      save: "Guardar",
      cancel: "Cancelar",
      delete: "Eliminar",
      edit: "Editar",
      emptyTextAlert: "¡El campo de texto no puede estar vacío!"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "pt", // idioma inicial
  interpolation: { escapeValue: false }
});

export default i18n;
