package br.com.serratec.anotacoes.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    //Erros de Validação
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErroResposta> handleValidation(
            MethodArgumentNotValidException ex) {

        List<String> erros = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(FieldError::getDefaultMessage)
                .collect(Collectors.toList());

        ErroResposta erro = new ErroResposta(400, "Erro de validação",
                LocalDateTime.now(), erros);
        return ResponseEntity.badRequest().body(erro);
    }

    //Login inválido
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ErroResposta> handleBadCredentials(
            BadCredentialsException ex) {

        ErroResposta erro = new ErroResposta(401, ex.getMessage(),
                LocalDateTime.now(), null);
        return ResponseEntity.status(401).body(erro);
    }

    //Erros genéricos
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErroResposta> handleRuntime(RuntimeException ex) {
        int status = ex.getMessage().contains("não encontrado") ? 404 : 400;
        ErroResposta erro = new ErroResposta(status, ex.getMessage(),
                LocalDateTime.now(), null);
        return ResponseEntity.status(status).body(erro);
    }

    //Classe interna de resposta de erro
    public static class ErroResposta {
        private int status;
        private String mensagem;
        private LocalDateTime dataHora;
        private List<String> erros;

        public ErroResposta(int status, String mensagem,
                            LocalDateTime dataHora, List<String> erros) {
            this.status = status;
            this.mensagem = mensagem;
            this.dataHora = dataHora;
            this.erros = erros;
        }

        public int getStatus() { return status; }
        public String getMensagem() { return mensagem; }
        public LocalDateTime getDataHora() { return dataHora; }
        public List<String> getErros() { return erros; }
    }
}
