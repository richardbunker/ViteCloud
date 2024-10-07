# Route 53 hosted zone for the custom domain
data "aws_route53_zone" "hosted_zone" {
  name = var.domain_name
}

# Route53 DNS record for the CloudFront distribution
resource "aws_route53_record" "vite_spa_record" {
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  name    = "${var.app_name}.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.vite_spa_distribution.domain_name
    zone_id                = aws_cloudfront_distribution.vite_spa_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

# Route53 record to validate ACM certificate
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name  = dvo.resource_record_name
      type  = dvo.resource_record_type
      value = dvo.resource_record_value
    }
  }

  name    = each.value.name
  type    = each.value.type
  zone_id = data.aws_route53_zone.hosted_zone.zone_id
  records = [each.value.value]
  ttl     = 300
}
