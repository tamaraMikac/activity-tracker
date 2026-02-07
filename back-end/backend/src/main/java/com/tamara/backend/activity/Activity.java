package com.tamara.backend.activity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.time.LocalDate;


@Entity
@Table(name="activity")

public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String ime;
    private String opis;
    private String kategorija;

    @NotNull
    private LocalDate datum;

    @Positive
    private Integer trajanje;


    public Long getId() {return id; }
    public void setId(Long id) {this.id = id; }

    public String getIme() {return ime;}
    public void setIme( String ime ) {this.ime = ime; }

    public String getOpis() {return opis; }
    public void setOpis(String opis) { this.opis = opis;} 

    public String getKategorija() {return kategorija; }
    public void setKategorija(String kategorija) { this.kategorija = kategorija; }

    public LocalDate getDatum() {return datum;}
    public void setDatum(LocalDate datum) {this.datum = datum; }

    public Integer getTrajanje() {return trajanje;}
    public void setTrajanje(Integer trajanje) { this.trajanje = trajanje; }
}
