# S3 Bucket for hosting the Vite app
resource "aws_s3_bucket" "vite_spa_bucket" {
  bucket = "${var.app_name}.${var.domain_name}"
}

# Disable block public policy for the bucket
resource "aws_s3_bucket_public_access_block" "vite_spa_bucket_public_access_block" {
  bucket = aws_s3_bucket.vite_spa_bucket.id

  block_public_acls       = false
  block_public_policy     = false
  restrict_public_buckets = false
  ignore_public_acls      = false
}

# S3 bucket website configuration
resource "aws_s3_bucket_website_configuration" "vite_spa_bucket_website" {
  bucket = aws_s3_bucket.vite_spa_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

# S3 bucket policy to allow public read access to the bucket
resource "aws_s3_bucket_policy" "vite_spa_bucket_policy" {
  bucket = aws_s3_bucket.vite_spa_bucket.id

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action    = "s3:GetObject",
        Effect    = "Allow",
        Resource  = "${aws_s3_bucket.vite_spa_bucket.arn}/*",
        Principal = "*"
      }
    ]
  })
}

# Uploading the contents of ./dist to S3
resource "aws_s3_object" "vite_spa_dist_files" {
  for_each = fileset("../spa/dist", "**")

  content_type = lookup(
    {
      "html" = "text/html",
      "css"  = "text/css",
      "js"   = "application/javascript"
    },
    split(".", each.value)[length(split(".", each.value)) - 1],
    "application/octet-stream"
  )

  bucket = aws_s3_bucket.vite_spa_bucket.id
  key    = each.value
  source = "../spa/dist/${each.value}"
  etag   = filemd5("../spa/dist/${each.value}")
}
