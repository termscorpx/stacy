require 'nokogiri'


Dir.glob('*.html') do |filename|
  File.open(filename, 'w') do |file|
    doc = Nokogiri::HTML.parse(file)
    
    doc.css('a').each do |link_node|
      link_node['href'] = link_node['href'].gsub('https://termsdev.co', '.')
    end

    file.write doc.to_html
  end
end
