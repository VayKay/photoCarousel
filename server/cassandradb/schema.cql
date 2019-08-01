CREATE KEYSPACE IF  NOT EXISTS gallery WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 1};
USE gallery;
CREATE TABLE IF NOT EXISTS photos (
    id int,
    listing_id int,
    photoUrl text,
    tinyUrl text,
    caption text,
    priority int,
    PRIMARY KEY (listing_id, id)
 ) WITH compression = {'class': 'LZ4Compressor', 'chunk_length_in_kb': 4};
 ALTER TABLE photos WITH GC_GRACE_SECONDS = 0;
