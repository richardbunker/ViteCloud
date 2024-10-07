# CloudFront distribution for the Vite app
resource "aws_cloudfront_distribution" "vite_spa_distribution" {
  enabled             = true
  default_root_object = "index.html"

  origin {
    domain_name = aws_s3_bucket.vite_spa_bucket.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.vite_spa_bucket.id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.origin_access_identity.cloudfront_access_identity_path
    }
  }

  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = aws_s3_bucket.vite_spa_bucket.id
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      headers          = ["content-type"]
      query_string = true
      cookies {
        forward = "none"
      }
    }
  }

  # Add this block to handle 403 errors
  custom_error_response {
    error_code            = 403
    response_code         = 200
    response_page_path    = "/index.html"
    error_caching_min_ttl = 0  # Disable caching for errors
  }

  # Custom error response to handle SPA routing
  custom_error_response {
    error_code          = 404
    response_code       = 200
    response_page_path  = "/index.html"
    error_caching_min_ttl = 0  # Disable caching for errors
  }

  viewer_certificate {
    acm_certificate_arn            = aws_acm_certificate_validation.cert_validation.certificate_arn
    ssl_support_method              = "sni-only"
    minimum_protocol_version        = "TLSv1.2_2021"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  aliases = ["${var.app_name}.${var.domain_name}"]
}

# CloudFront Origin Access Identity
resource "aws_cloudfront_origin_access_identity" "origin_access_identity" {
  comment = "Access to S3 for CloudFront"
}
