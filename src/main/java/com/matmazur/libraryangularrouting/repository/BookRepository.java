package com.matmazur.libraryangularrouting.repository;

import com.matmazur.libraryangularrouting.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
}
