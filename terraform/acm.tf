# ACM Certificate for CloudFront 
resource "aws_acm_certificate" "cert" {
  provider           = aws.us_east_1
  domain_name        = "${var.app_name}.${var.domain_name}"
  validation_method  = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# Validate the certificate using Route53
resource "aws_acm_certificate_validation" "cert_validation" {
  provider        = aws.us_east_1
  certificate_arn = aws_acm_certificate.cert.arn

  validation_record_fqdns = [
    for dvo in aws_acm_certificate.cert.domain_validation_options : aws_route53_record.cert_validation[dvo.domain_name].fqdn
  ]
}
