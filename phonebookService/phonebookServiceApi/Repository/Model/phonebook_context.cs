using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace phonebookServiceApi.Repository.Model
{
    public partial class PhonebookContext : DbContext
    {
        public PhonebookContext()
        {
        }

        public PhonebookContext(DbContextOptions<PhonebookContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Entry> Entries { get; set; }
        public virtual DbSet<PhoneBookEntries> PhoneBookEntries { get; set; }
        public virtual DbSet<Phonebook> Phonebook { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlite("Data Source=database\\phonebook.db");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Entry>(entity =>
                       {
                           entity.ToTable("entry");

                           entity.Property(e => e.Id).HasColumnName("Id");

                           entity.Property(e => e.Name)
                               .IsRequired()
                               .HasColumnName("Name");

                           entity.Property(e => e.PhoneNumber).HasColumnName("PhoneNumber");
                       });

            modelBuilder.Entity<Phonebook>(entity =>
                        {
                            entity.ToTable("phonebook");

                            entity.Property(e => e.Id).HasColumnName("Id");

                            entity.Property(e => e.Name)
                                .HasColumnName("Name");

                            entity.Property(e => e.UserId).HasColumnName("UserId");

                            entity.HasOne(d => d.user)
                                .WithMany(p => p.Phonebook)
                                .HasForeignKey(d => d.UserId);
                        });

            modelBuilder.Entity<PhoneBookEntries>(entity =>
                {
                    entity.HasKey(e => new { e.Phonebook_id, e.entry_id });

                    entity.ToTable("phonebook_entries");

                    entity.Property(e => e.Phonebook_id).HasColumnName("phonebook_id");

                    entity.Property(e => e.entry_id).HasColumnName("entry_id");

                    entity.HasOne(d => d.Phonebook)
                        .WithMany(p => p.PhoneBookEntries)
                        .HasForeignKey(d => d.Phonebook_id)
                        .OnDelete(DeleteBehavior.ClientSetNull);

                    entity.HasOne(d => d.Entry)
                        .WithMany(p => p.PhoneBookEntries)
                        .HasForeignKey(d => d.entry_id)
                        .OnDelete(DeleteBehavior.ClientSetNull);
                });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("Id");

                entity.Property(e => e.CreatedDate).HasColumnName("created_date");
                
                entity.Property(e => e.Name)
                .IsRequired()
                .HasColumnName("Name");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasColumnName("Username");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("Password");
            });


            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
