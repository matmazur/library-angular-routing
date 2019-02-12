package com.matmazur.libraryangularrouting.controller.rest;

import com.matmazur.libraryangularrouting.model.Book;
import com.matmazur.libraryangularrouting.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import javax.xml.ws.Response;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookEndpoint {

    private final BookRepository repo;

    @Autowired
    public BookEndpoint(BookRepository repo) {
        this.repo = repo;
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Book>> getBooks() {

        List<Book> list = repo.findAll();
        if (list.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(list);
    }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Book> getBookById(@PathVariable Long id) {

        Book managed = repo.findById(id).orElse(null);
        if (managed == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(managed);
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveBook(@RequestBody Book book) {

        if (book.getId() == null) {
            Book managed = repo.save(book);

            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest()
                    .path("/{id}")
                    .buildAndExpand(managed.getId())
                    .toUri();

            return ResponseEntity.created(location).build();
        } else return ResponseEntity.status(HttpStatus.CONFLICT).build();
    }
}
