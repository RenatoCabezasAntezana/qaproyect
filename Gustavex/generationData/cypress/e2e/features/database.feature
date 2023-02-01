Feature: Mysql automation
    Scenario: Select products from ecommerce database
        Given select products
        When insert products
            | nombre  | precio |
            | tv      | 100    |
            | celular | 240    |
        Then verify products inserts
