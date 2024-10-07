provider "aws" {
  region = "ap-southeast-2"

  default_tags {
    tags = {
      ServiceName = var.service_name
      CostCenter  = var.cost_center
    }
  }
}

provider "aws" {
  alias  = "us_east_1"  # Alias for us-east-1
  region = "us-east-1"  # Required for ACM with CloudFront
}
